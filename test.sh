#!/bin/sh

set -eux

# git ls-files | nix run nixpkgs#entr ./test.sh

git add .
git commit -m "."
git push origin master
sleep 1

nix run nixpkgs#gh -- workflow run -R grahamc/nix-starter-flakes publish-generic.yml --field tag=go-v0.1.0
export tag=go-v0.1.$(date +%s)

git tag "$tag"
git push origin "$tag"