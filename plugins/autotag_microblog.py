
def autotag_microblog():
    def autotag_microblog_plugin(files, hana):
        for _, f in files:
            if not f.get('title'):
                if 'tags' not in f:
                    f['tags'] = []
                f['tags'].append('microblog')

    return autotag_microblog_plugin


