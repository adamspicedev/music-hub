import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async getArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
      include: {
        albums: true,
      },
    });

    if (!artist) throw new BadRequestException('Artist not found');

    return artist;
  }

  async getArtists() {
    return await this.prisma.artist.findMany();
  }
}
