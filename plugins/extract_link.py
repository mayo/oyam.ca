
# NOTE: special handling for links (helps with feeds)
def extract_link():
    import re
    import posixpath

    pat = re.compile(r'<a\s+.*\s*href="(?P<link>[^"]+)"\s*.*>.*')

    def extract_link_plugin(files, hana):
        for _, f in files:
            if f['type'] == 'link' and 'href' not in f:
                f['href'] = pat.search(f['contents']).group('link')

    return extract_link_plugin


