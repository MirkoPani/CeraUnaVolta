using CeraUnaVolta.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CeraUnaVolta.Services
{
    public class ImageService : IImageService
    {
        public List<ImageData> Immagini { get; }

        public ImageService()
        {
            Immagini = new List<ImageData>
            {
                new ImageData
                {
                    Didascalia = "Test didascalia",
                    Source = "img/test/test-image.jpeg",
                    Titolo = "Titolo di prova"
                },
                new ImageData
                {
                    Didascalia = "Discalia di Immagine 2",
                    Source = "img/test/villa.jpg",
                    Titolo = "Titolo 2"
                }
            };



        }

    }
}
