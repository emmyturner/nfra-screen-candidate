import os

import redis  # https://github.com/redis/redis-py/tree/v5.2.1
from flask import Flask

app = Flask(__name__)
client = redis.from_url(os.environ.get('REDIS_SERVER'))

port = os.environ.get('SERVER_PORT')
address = os.environ.get('BINDING_ADDRESS')

# Set initial visits
client.set('visits', 0)


# defining the root endpoint
@app.route('/')
def index():
    visits = client.get('visits')
    client.set('visits', int(visits) + 1)
    return f'Number of visits is: {visits}'


# specifying the listening port
if __name__ == '__main__':
    print('Listening on port 8081')
    app.run(host=address, port=port)
