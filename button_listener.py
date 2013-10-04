import os
import time
import subprocess
from evdev import InputDevice, categorize
from select import select

DEV = InputDevice('/dev/input/event5')

while True:
    r, w, x = select([DEV], [], [])
    for event in DEV.read():
        evt = categorize(event).event
        if evt.code == 272 and evt.value == 1:
            # Kill firefox.
            os.system('pkill firefox')

            # Remove the restore file from the defualt profile.
            base_dir = '/home/micah/.mozilla/firefox/'
            dirs = ['{}{}'.format(base_dir, d)
                    for d in os.listdir(base_dir)
                    if '.default' in d]
            try:
                for d in dirs:
                    os.remove('{}/{}'.format(d, 'sessionstore.js'))
            except OSError:
                pass
            '''
            To prevent firefox from starting in safe mode, make the 
            following changes in its about:config.
            toolkit.startup.max_resumed_crashes = 9999
            '''
            subprocess.Popen(['firefox', 'localhost:6666'])

            # Sleep to handle consecutive button presses/
            time.sleep(15)

            # Reset the device so the events are fresh.
            DEV = InputDevice('/dev/input/event5')
