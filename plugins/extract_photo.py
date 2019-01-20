# Special handling for photo posts (helps with feeds)

def extract_photo():
    import re
    import posixpath

    pat = re.compile(r'<img\s+.*\s*src="(?P<photo>[^"]+)"\s*.*>.*')

    def extract_photo_plugin(files, hana):
        for _, f in files:
            if f['type'] == 'photo' and 'photo' not in f:
                f['image'] = pat.search(f['contents']).group('photo')

    return extract_photo_plugin


