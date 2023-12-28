#!/bin/sh

SCRIPTDIR=$(dirname $0)/../
CONTENT_DIR="content"

KEY="50fec3a364b59bee734d0e9b56a3789ced4d2dd7"
# Generated at https://keyoxide.org/util/wkd. Z-Base-32 encoded SHA1 of "mayo@oyam.ca" (Primary key UID)
HANDLE="sjd3shepa5rmabd9ggran4dsd5fd4sec"

gpg --export $KEY > content/.well-known/openpgpkey/hu/$HANDLE
gpg --export --armor $KEY > content/pubkey.txt