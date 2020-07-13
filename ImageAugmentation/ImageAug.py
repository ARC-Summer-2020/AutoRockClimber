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

directory = '/Users/mary/Downloads/ARC_Dataset_Rockwall'
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        image_path = load_img(filename)
        data = img_to_array(image_path)
        samples = expand_dims(data, 0)
        gen = ImageDataGenerator(rotation_range=12, width_shift_range=0.2, 
        height_shift_range=0.1, shear_range=0.2, zoom_range=0.14, channel_shift_range=13, horizontal_flip=True)
        it = gen.flow(samples, batch_size=1)
        batch = it.next()
        image = batch[0].astype('uint8')
        pyplot.imshow(image)
        pyplot.show()
        continue
    else:
        continue


# img_path = load_img('/Users/mary/Downloads/test_Owl.jpg')
# # convert to numpy array
# data = img_to_array(img_path)
# # expand dimension to one sample
# samples = expand_dims(data, 0)
# # create image data augmentation generator
# gen = ImageDataGenerator(rotation_range=12, width_shift_range=0.2, 
# height_shift_range=0.1, shear_range=0.2, zoom_range=0.14, channel_shift_range=13, horizontal_flip=True)
# # prepare iterator
# it = gen.flow(samples, batch_size=1)
# # generate samples and plot

# # generate batch of images
# batch = it.next()
# # convert to unsigned integers for viewing
# image = batch[0].astype('uint8')
# # plot raw pixel data
# pyplot.imshow(image)
# # show the figure
# pyplot.show()