#!/bin/sh

[ -z "${ENCRYPTION_KEY}" ] && echo "Missing encryption key" && exit 1
[ -z "$1" ] && echo "Please provide a file to encrypt" && exit 1

openssl aes-256-cbc -k "${ENCRYPTION_KEY}" -md sha256 -in "$1" -out "$1".enc
