#!/bin/bash -xe

install_runtime() {
    local arch="$1"
    local runtime="$2"
    local version="$3"
    install_flatpak "runtime/${runtime}/$arch/$version"
}

install_flatpak() {
    local ref="$1"
    if [[ ! -d "$HOME/.local/share/flatpak/$ref" ]]; then
        flatpak install --user --no-deps --assumeyes "$ref"
    fi
}

flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

for arch in i386 x86_64; do
    install_runtime $arch org.freedesktop.Sdk 1.6
    install_runtime $arch org.freedesktop.Platform 1.6
done
