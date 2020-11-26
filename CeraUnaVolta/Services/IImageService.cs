using CeraUnaVolta.Models;
using System.Collections;
using System.Collections.Generic;

namespace CeraUnaVolta.Services
{
    public interface IImageService
    {
        public List<ImageData> Immagini { get; }
    }
}