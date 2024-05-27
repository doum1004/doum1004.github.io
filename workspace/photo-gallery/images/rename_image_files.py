import os
import glob
import shutil
from PIL import Image
import click

# get a list of all files
filter = "*.jpg"
fnames = glob.glob("orgin/" + filter)

srcFolder = 'src'
if not os.path.exists(srcFolder):
    os.mkdir(srcFolder)
thumbFolder = 'thumb'
if not os.path.exists(thumbFolder):
    os.mkdir(thumbFolder)

#
with click.progressbar(enumerate(fnames), length=len(fnames), show_pos=True) as bar:
    for i, fname in bar:
        foo = Image.open(fname)  # My image is a 200x374 jpeg that is 102kb large
        # foo.size  # (200, 374)
        
        # # downsize the image with an ANTIALIAS filter (gives the highest quality)
        # foo = foo.resize((160,300),Image.ANTIALIAS)
        
        foo.save('%s/%d.jpg' % (srcFolder, i), quality=50)
        foo.save('%s/%d.jpg' % (thumbFolder, i), quality=10)