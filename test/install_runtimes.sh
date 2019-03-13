#!/bin/bash -xe

install_runtime() {
    local arch="$1"
    local runtime="$2"
    local url="$3"
    if [[ ! -d "$HOME/.local/share/flatpak/runtime/${runtime}.Locale/$arch" ]]; then
        flatpak install --user --no-deps --assumeyes --arch $arch --from $url
    fi
}

for arch in i386 x86_64; do
    install_runtime $arch org.freedesktop.Sdk https://raw.githubusercontent.com/endlessm/flatpak-bundler/master/refs/freedesktop-sdk-1.4.flatpakref
    install_runtime $arch org.freedesktop.Platform https://raw.githubusercontent.com/endlessm/flatpak-bundler/master/refs/freedesktop-runtime-1.4.flatpakref
done
