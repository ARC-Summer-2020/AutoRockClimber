from keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from numpy import expand_dims
from matplotlib import pyplot
import os

# hard coding a directory, choose the directory the images are stored in
directory = ''

for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        path = directory + '/' + filename
        image_path = load_img(path)
        data = img_to_array(image_path)
        samples = expand_dims(data, 0)
        gen = ImageDataGenerator(rotation_range=15, width_shift_range=0.3, 
        height_shift_range=0.16, shear_range=0.2, zoom_range=0.15, channel_shift_range=13, horizontal_flip=True, vertical_flip= True)
        
        # prepare iterator, dont forget to fill out which directory you want to save the images to
        it = gen.flow(samples, batch_size=1, save_to_dir='', 
        save_prefix='Aug_ARC4', save_format='jpg')
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