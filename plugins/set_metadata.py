
def set_metadata(metadata):

    def set_metadata_plugin(files, hana):
        for _, f in files:
            f.update(metadata)

    return set_metadata_plugin


