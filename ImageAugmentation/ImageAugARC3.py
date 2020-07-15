import matplotlib.pyplot as plt
import numpy as np
from scipy import misc, ndimage
import keras
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from sklearn.preprocessing import LabelEncoder
import PIL

from numpy import expand_dims
from matplotlib import pyplot

import os

directory = '/Users/mary/Documents/PersonalProject/AutoRockClimber/ImageAugmentation/ARC_Dataset_Rockwall/ARC3'
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        path = directory + '/' + filename
        image_path = load_img(path)
        data = img_to_array(image_path)
        samples = expand_dims(data, 0)
        gen = ImageDataGenerator(rotation_range=12, width_shift_range=0.17, 
        height_shift_range=0.3, shear_range=0.2, zoom_range=0.1, channel_shift_range=15, horizontal_flip=True, vertical_flip= True)
        # prepare iterator
        it = gen.flow(samples, batch_size=1, save_to_dir='/Users/mary/Documents/PersonalProject/AutoRockClimber/ImageAugmentation/ARC_Dataset_Rockwall/ARC_AUG', 
        save_prefix='Aug_ARC3', save_format='jpg')
        # generate samples and plot
        for i in range(3):
            # generate batch of image
            batch = it.next()
            # convert to unsigned integers for viewing
            image = batch[0].astype('uint8')
            # plot raw pixel data
            pyplot.imshow(image)

    # show the figure
    # pyplot.show()