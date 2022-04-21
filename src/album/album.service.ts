import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: {
        artist: true,
        songs: true,
      },
    });

    if (!album) throw new BadRequestException('Album not found');

    return album;
  }

  async getAlbums() {
    return await this.prisma.album.findMany();
  }
}
