import json
import sys

if __name__ == '__main__':
    data = json.loads(sys.argv[1])
    sender = data['sender']
    message = data['message']

    print(f'Thankyou for your message {sender}!, your message was: {message} it cointains {len(message)} characters.')
