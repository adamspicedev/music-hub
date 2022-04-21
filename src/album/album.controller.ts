import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { AlbumService } from './album.service';

@Public()
@ApiTags('albums')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @ApiResponse({
    status: 200,
    description: 'The found album',
    type: Prisma.Prisma__AlbumClient,
  })
  @Get('/:id')
  async getArtistById(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @ApiResponse({
    status: 200,
    description: 'All available artists',
    type: Prisma.Prisma__AlbumClient,
  })
  @Get('/')
  async getArtists() {
    return this.albumService.getAlbums();
  }
}
