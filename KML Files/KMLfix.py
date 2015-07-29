
#to be a python fix for KML files.

# *START
#
# *open Remasterd.kml
# *look for <Folder> tags and cut text out from there
# *look at <name> and rename file to that name
# *insert blurb:
#
# <?xml version='1.0' encoding='UTF-8'?>
# <kml xmlns='http://www.opengis.net/kml/2.2'>
# 	<Document>
# 		<name>GSU Map [Updated Version]</name>
# 		<description><![CDATA[]]></description>
#
# *paste cut info to new file after <description><![CDATA[]]></description>
# *insert:
#
# </Document>
# </kml>
#
# *END

# *furthermore...
# *open gsuMapjs.js
# *look for school in var kml =
# *use the first word of <name> to get the identifier e.g. tech = Tech Facilities.kml
# *insert according to this input: but leave url blank
#
# academic: {
# name: "Academic Buildings",
# url: "https://docs.google.com/uc?export=download&id=0BzWKUFriQmXleW5NR3ZVeFJ6ajA"
# },
#
# *EXCEPT where the last file in the directory is, then delete the comma.
# *END

# *Possible?
# *access google auth
# *upload new file to drive
# *share new file with direct document creator
# *click buttons and copy url to json
