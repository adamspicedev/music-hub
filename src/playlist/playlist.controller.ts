import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreatePlaylistDto } from './dto';
import { UpdatePlaylistSongsDto } from './dto/update-playlist-songs.dto';
import { PlaylistService } from './playlist.service';

@ApiTags('playlists')
@ApiBearerAuth('JWT')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Public()
  @ApiResponse({
    status: 200,
    description: 'The found playlist',
    type: Prisma.Prisma__PlaylistClient,
  })
  @Get('/:id')
  async getPlaylist(@Param('id') id: string) {
    return await this.playlistService.getPlaylist(id);
  }

  @Public()
  @ApiResponse({
    status: 200,
    description: 'all available playlists',
    type: Prisma.Prisma__PlaylistClient,
  })
  @Get('/')
  async getPlaylists() {
    return await this.playlistService.getPlaylists();
  }

  @ApiOperation({ summary: 'Create Playlist' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 201,
    description: 'Playlist created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorised.',
  })
  @Post('/')
  async createPlayList(
    @Body() dto: CreatePlaylistDto,
    @GetCurrentUserId() ownerId: string,
  ) {
    return await this.playlistService.createPlayList(dto, ownerId);
  }

  @ApiOperation({ summary: 'Add song to a playlist' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 200,
    description: 'Playlist updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorised.',
  })
  @Post('/add-song')
  async addSongToPlaylist(
    @Body() dto: UpdatePlaylistSongsDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.playlistService.addSongToPlaylist(dto, userId);
  }

  @ApiOperation({ summary: 'Delete Song from a playlist' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 200,
    description: 'Playlist updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorised.',
  })
  @Delete('remove-song')
  async deleteSongFromPlaylist(
    @Body() dto: UpdatePlaylistSongsDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.playlistService.deleteSongFromPlaylist(dto, userId);
  }
}
