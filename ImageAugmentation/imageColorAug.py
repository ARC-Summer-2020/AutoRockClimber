from PIL import Image, ImageEnhance
import os

# hard coding a directory, choose the directory the images are stored in
directory = '/Users/mary/Documents/PersonalProject/images'
i = 0
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        path = directory + '/' + filename
        #to save the new image as a separate image
        new_path = directory + '/'
        img = Image.open(path)
        r, g, b = img.split()

        #play around with the combo of bgr to get different colors
        color = Image.merge('RGB', (b, r, g))

        #hardcode new path, using {0} with format(i+1) to configure new file name
        color.save("/Users/mary/Documents/PersonalProject/images/file{0}.jpg".format(i+1))
    i+=1
