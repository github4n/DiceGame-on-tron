import asyncio
import os
import sys
import time
from getpass import getpass

from telethon import TelegramClient, events
from telethon.errors import SessionPasswordNeededError
from telethon.errors import UserPrivacyRestrictedError
from telethon.network import ConnectionTcpAbridged
from telethon.utils import get_display_name
from telethon.tl.types import InputPeerUser
from telethon.tl.functions.messages import SendMessageRequest
from telethon.tl.functions.channels import InviteToChannelRequest

# Create a global variable to hold the loop we will be using
loop = asyncio.get_event_loop()

def sprint(string, *args, **kwargs):
    """Safe Print (handle UnicodeEncodeErrors on some terminals)"""
    try:
        print(string, *args, **kwargs)
    except UnicodeEncodeError:
        string = string.encode('utf-8', errors='ignore')\
                       .decode('ascii', errors='ignore')
        print(string, *args, **kwargs)


def print_title(title):
    """Helper function to print titles to the console more nicely"""
    sprint('\n')
    sprint('=={}=='.format('=' * len(title)))
    sprint('= {} ='.format(title))
    sprint('=={}=='.format('=' * len(title)))


def bytes_to_string(byte_count):
    """Converts a byte count to a string (in KB, MB...)"""
    suffix_index = 0
    while byte_count >= 1024:
        byte_count /= 1024
        suffix_index += 1

    return '{:.2f}{}'.format(
        byte_count, [' bytes', 'KB', 'MB', 'GB', 'TB'][suffix_index]
    )


async def async_input(prompt):
    """
    Python's ``input()`` is blocking, which means the event loop we set
    above can't be running while we're blocking there. This method will
    let the loop run while we wait for input.
    """
    print(prompt, end='', flush=True)
    return (await loop.run_in_executor(None, sys.stdin.readline)).rstrip()


def get_env(name, message, cast=str):
    """Helper to get environment variables interactively"""
    if name in os.environ:
        return os.environ[name]
    while True:
        value = input(message)
        try:
            return cast(value)
        except ValueError as e:
            print(e, file=sys.stderr)
            time.sleep(1)


class InteractiveTelegramClient(TelegramClient):
    """Full featured Telegram client, meant to be used on an interactive
       session to see what Telethon is capable off -
       This client allows the user to perform some basic interaction with
       Telegram through Telethon, such as listing dialogs (open chats),
       talking to people, downloading media, and receiving updates.
    """

    def __init__(self, session_user_id, api_id, api_hash,
                 proxy=None):
        """
        Initializes the InteractiveTelegramClient.
        :param session_user_id: Name of the *.session file.
        :param api_id: Telegram's api_id acquired through my.telegram.org.
        :param api_hash: Telegram's api_hash.
        :param proxy: Optional proxy tuple/dictionary.
        """
        print_title('Initialization')

        print('Initializing interactive example...')

        # The first step is to initialize the TelegramClient, as we are
        # subclassing it, we need to call super().__init__(). On a more
        # normal case you would want 'client = TelegramClient(...)'
        super().__init__(
            # These parameters should be passed always, session name and API
            session_user_id, api_id, api_hash,

            # You can optionally change the connection mode by passing a
            # type or an instance of it. This changes how the sent packets
            # look (low-level concept you normally shouldn't worry about).
            # Default is ConnectionTcpFull, smallest is ConnectionTcpAbridged.
            connection=ConnectionTcpAbridged,

            # If you're using a proxy, set it here.
            proxy=proxy
        )

        # Store {message.id: message} map here so that we can download
        # media known the message ID, for every message having media.
        self.found_media = {}

        #for test server
        #self.session.set_dc(2, '149.154.167.40', 80)

        # Calling .connect() may raise a connection error False, so you need
        # to except those before continuing. Otherwise you may want to retry
        # as done here.
        print('Connecting to Telegram servers...')
        try:
            loop.run_until_complete(self.connect())
        except IOError:
            # We handle IOError and not ConnectionError because
            # PySocks' errors do not subclass ConnectionError
            # (so this will work with and without proxies).
            print('Initial connection failed. Retrying...')
            loop.run_until_complete(self.connect())

        # If the user hasn't called .sign_in() or .sign_up() yet, they won't
        # be authorized. The first thing you must do is authorize. Calling
        # .sign_in() should only be done once as the information is saved on
        # the *.session file so you don't need to enter the code every time.
        if not loop.run_until_complete(self.is_user_authorized()):
            print('First run. Sending code request...')
            user_phone = input('Enter your phone: ')
            loop.run_until_complete(self.sign_in(user_phone))

            self_user = None
            while self_user is None:
                code = input('Enter the code you just received: ')
                try:
                    self_user =\
                        loop.run_until_complete(self.sign_in(code=code))

                # Two-step verification may be enabled, and .sign_in will
                # raise this error. If that's the case ask for the password.
                # Note that getpass() may not work on PyCharm due to a bug,
                # if that's the case simply change it for input().
                except SessionPasswordNeededError:
                    pw = getpass('Two step verification is enabled. '
                                 'Please enter your password: ')

                    self_user =\
                        loop.run_until_complete(self.sign_in(password=pw))

    async def run(self):
        """Main loop of the TelegramClient, will wait for user action"""

        # Once everything is ready, we can add an event handler.
        #
        # Events are an abstraction over Telegram's "Updates" and
        # are much easier to use.
        #self.add_event_handler(self.message_handler, events.NewMessage)

        # Enter a while loop to chat as long as the user wants
        while True:
            print()
            print('> Please tell me what you want to do')
            print('> Available commands:')
            print('  !q: Quits the dialogs window and exits.')
            print('  !l: Logs out, terminating this session.')
            print('  !i: check channel ids')
            print('  !v: send message and invitation')
            print()

            i = None
            while i is None:
                i = await async_input('Enter command: ')
                if i == '!q':
                    return
                if i == '!l':
                    # Logging out will cause the user to need to reenter the
                    # code next time they want to use the library, and will
                    # also delete the *.session file off the filesystem.
                    #
                    # This is not the same as simply calling .disconnect(),
                    # which simply shuts down everything gracefully.
                    await self.log_out()
                    return
                if i == '!i':
                    dialogs = await self.get_dialogs(limit=1000)
                    for j, dialog in enumerate(dialogs, start=1):
                        if dialog.is_user:
                            continue
                        sprint('{}. {}'.format(dialog.id, get_display_name(dialog.entity)))
                if i == '!v':
                    dialogs = await self.get_dialogs(limit=1000)
                    msg = 'Hiiii, You know what? I finally found a gooooood project to make money easily.  Join the campaign with me to earn TRX directly,. I have earned 30 TRX already. First come first served.  https://t.me/tronoscar .You can subcribe your email address and get the bonus.A secure, verified  and transparent platform, TronOscar will be launching at 9:00 pm 1st June (GMT-4).Welcome and earn money together!'#await async_input('Enter a message: ')
                    #id = await async_input('Enter a channel link: ')

                    channel = await self.get_entity(-1001414169261)
                    for j, dialog in enumerate(dialogs, start=1):
                        if dialog.is_channel == False or dialog.id == -1001414169261:
                            continue
                        entity = dialog.entity
                        print_title('Chat with "{}"'.format(get_display_name(entity)))
                        
                        async for user in self.iter_participants(entity):  
                            try:            
                                if user.bot == True or user.is_self == True:
                                    continue
                                await self.send_message(user,msg)
                                time.sleep(300)
                                result = await self(InviteToChannelRequest(
                                    channel,
                                    [user]
                                ))
                                time.sleep(350)
                            except UserPrivacyRestrictedError:
                                print ("The user's privacy settings do not allow you to do this")
                            


if __name__ == '__main__':
    SESSION = None
    API_ID = '762822'
    API_HASH = 'c3efe5c1258aef79af9ec0ee5a3624ca'
    client = InteractiveTelegramClient(SESSION, API_ID, API_HASH)
    loop.run_until_complete(client.run())


    #785185/4d924c827465abda20ccb35b635c73ee/13148450142
    #705085/03402f61e8504c3c6427ce9546e793fa/16621044460
    #726976/9fb2aa0e1a0d9204faada737a9f3d5ec/13585675909
    #762822/c3efe5c1258aef79af9ec0ee5a3624ca/18876338110

    #机器人1账号 13148450142（验证码 Wayne）
    #机器人2账号  16621044460 （验证码Mona）
    #机器人3账号 18017638112 （验证码赫尧）
    #机器人4账号 18876338110 （验证码赫尧）