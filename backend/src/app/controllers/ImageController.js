class ImageController {
  async store(request, response) {
    const { filename: path } = request.file;

    return response.json({
      filename: path,
      url: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${path}`,
    });
  }
}

export default new ImageController();
