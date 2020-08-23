from PIL import Image, ImageEnhance
import os

# Hard coding a directory, choose the directory the images are stored in
directory = '/Users/mary/Documents/PersonalProject/images'
new_file_names = -1
# Iterates over images that are contained in the directory
for filename in os.listdir(directory):
    if filename.endswith('.jpg'):
        path = directory + '/' + filename
        # To save the new image as a separate image
        new_path = directory + '/'
        img = Image.open(path)

        # To get the mode of the pic, whether is contains 3 or 4 colors
        if(img.mode == 'RGB'):
            # Returns a tuple
            r, g, b = img.split()   

            # Play around with the combo of bgr to get different colors
            # Images that are made of 3 colors in a channel are refered to as 'RGB'
            new_img = Image.merge('RGB', (r, g, b))

        elif(img.mode == 'RGBA'):
            # Returns a tuple
            r, g, b, a = img.split()      
            # Images that are made of 4 colors in a channel are referd to as 'RGBA'
            new_img = Image.merge('RGB', (r, g, b, a))

        # Hardcode new path, using {0} with format(new_file_names+1) to configure new file name
        new_img.save("/Users/mary/Documents/PersonalProject/images/Altered/img{0}.jpg".format(new_file_names+1))
    
        # This is the ending number to the new image file name, ex: img1, img2, etc.
        new_file_names += 1             
