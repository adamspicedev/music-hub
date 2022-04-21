import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { SongService } from './song.service';
import { Prisma } from '@prisma/client';

@Public()
@ApiTags('songs')
@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @ApiResponse({
    status: 200,
    description: 'The found song',
    type: Prisma.Prisma__SongClient,
  })
  @Get('/:id')
  async getSongById(@Param('id') id: string) {
    return this.songService.getSong(id);
  }

  @ApiResponse({
    status: 200,
    description: 'All available songs',
    type: Prisma.Prisma__SongClient,
  })
  @Get('/')
  async getSongs() {
    return this.songService.getSongs();
  }
}
