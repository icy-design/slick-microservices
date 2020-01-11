FROM php:7.1-fpm as builder
RUN apt-get update \
    && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev wget \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && :\
    && apt-get install -y libicu-dev \
    && docker-php-ext-install intl \
    && :\
    && apt-get install -y libxml2-dev \
    && apt-get install -y libxslt-dev \
    && docker-php-ext-install soap \
    && docker-php-ext-install xsl \
    && docker-php-ext-install xmlrpc \
    && docker-php-ext-install wddx \
    && :\
    && apt-get install -y libbz2-dev \
    && docker-php-ext-install bz2 \
    && :\
    && docker-php-ext-install zip \
    && docker-php-ext-install pcntl \
    && docker-php-ext-install exif \
    && docker-php-ext-install bcmath \
    && docker-php-ext-install calendar \
    && docker-php-ext-install sockets \
    && docker-php-ext-install gettext \
    && docker-php-ext-install shmop \
    && docker-php-ext-install sysvmsg \
    && docker-php-ext-install sysvsem \
    && docker-php-ext-install sysvshm \
    && docker-php-ext-install opcache

RUN pecl install grpc && docker-php-ext-enable grpc
RUN pecl install protobuf && docker-php-ext-enable protobuf

RUN apt-get install -y \
        librabbitmq-dev \
        libssh-dev \
    && docker-php-ext-install \
        bcmath \
        sockets
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
WORKDIR /src/productcatalog
COPY server/composer.json composer.json
RUN composer config repo.packagist composer https://mirrors.aliyun.com/composer/
RUN composer install
COPY Server.php ./vendor/spiral/php-grpc/src/Server.php
# 复制配置文件到 /usr/local
COPY etc /usr/local/etc
COPY php.ini /usr/local/etc/phpbuster-updates

RUN set -xe \
    && export RR_VERSION=${RR_VERSION:-`wget -qO - "https://api.github.com/repos/spiral/php-grpc/releases/latest" \
      | grep '"tag_name":' \
      | sed -E 's/.*"v([^"]+)".*/\1/'`} \
    && wget "https://github.com/spiral/php-grpc/releases/download/v${RR_VERSION}/rr-grpc-${RR_VERSION}-linux-amd64.tar.gz" \
      -O /tmp/rr.tar.gz \
    && tar zxvf /tmp/rr.tar.gz -C /tmp \
    && mv "/tmp/rr-grpc-${RR_VERSION}-linux-amd64/rr-grpc" /usr/bin/rr \
    && rm -Rf "/rr-grpc-${RR_VERSION}-linux-amd64" /tmp/rr.tar.gz \
    && rr -v

FROM builder
COPY server /productcatalogservice
WORKDIR /productcatalogservice
RUN chmod -R 777 /productcatalogservice
COPY --from=builder /src/productcatalog/vendor ./vendor
COPY --from=builder /usr/bin/rr /usr/bin/rr
ADD start.sh start.sh
RUN chmod +x start.sh
CMD sh start.sh

