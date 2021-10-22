FROM ubuntu-20.04

RUN apt update && DEBIAN_FRONTEND="noninteractive" apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    wget \
    pkg-config

# Install Redis.
RUN \
    cd /tmp && \
    wget http://download.redis.io/redis-stable.tar.gz &&
    tar xvzf redis-stable.tar.gz &&
    cd redis-stable &&
    make JEMALLOC_CONFIGURE_OPTS=--with-lg-vaddr=48 &&
    make install &&
    cp -f src/redis-sentinel /usr/local/bin &&
    mkdir -p /etc/redis &&
    cp -f *.conf /etc/redis &&
    rm -rf /tmp/redis-stable* &&
    sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf &&
    sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf &&
    sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf &&
    sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf &&
    sed -i 's/protected-mode yes/protected-mode no/' /etc/redis/redis.conf

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD "/usr/local/bin/redis-server" "/etc/redis/redis.conf"

# Expose ports.
EXPOSE 6379
