import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { ArtistService } from './artist.service';

@Public()
@ApiTags('artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiResponse({
    status: 200,
    description: 'The found song',
    type: Prisma.Prisma__ArtistClient,
  })
  @Get('/:id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @ApiResponse({
    status: 200,
    description: 'All available artists',
    type: Prisma.Prisma__ArtistClient,
  })
  @Get('/')
  async getArtists() {
    return this.artistService.getArtists();
  }
}
