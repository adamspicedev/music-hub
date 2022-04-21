import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongService {
  constructor(private readonly prisma: PrismaService) {}

  async getSong(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: {
        album: true,
      },
    });

    if (!song) throw new BadRequestException('Song not found');

    return song;
  }

  async getSongs() {
    return await this.prisma.song.findMany();
  }
}
