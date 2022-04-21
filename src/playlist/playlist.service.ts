import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaylistDto } from './dto';
import { UpdatePlaylistSongsDto } from './dto/update-playlist-songs.dto';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlaylist(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        id: id,
      },
      include: {
        songs: true,
        owner: true,
      },
    });

    if (!playlist) throw new BadRequestException('Playlist not found');

    return playlist;
  }

  async getPlaylists() {
    return this.prisma.playlist.findMany({});
  }

  async createPlayList(dto: CreatePlaylistDto, ownerId: string) {
    return this.prisma.playlist.create({
      data: {
        name: dto.name,
        ownerId: ownerId,
      },
    });
  }

  async addSongToPlaylist(dto: UpdatePlaylistSongsDto, userId: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        id: dto.playlistId,
      },
    });

    if (!playlist) throw new BadRequestException('Playlist not found');
    if (playlist.ownerId !== userId)
      throw new ForbiddenException('You are not the owner of this playlist');

    const song = await this.prisma.song.findUnique({
      where: {
        id: dto.songId,
      },
    });

    if (!song) throw new BadRequestException('Song not found');
    const existingPlaylistSong = await this.prisma.songsOnPlaylists.findMany({
      where: {
        playlistId: dto.playlistId,
        songId: dto.songId,
      },
    });

    if (existingPlaylistSong.length > 0)
      throw new BadRequestException('Song already added');

    await this.prisma.songsOnPlaylists.create({
      data: {
        playlistId: dto.playlistId,
        songId: dto.songId,
      },
    });

    return await this.prisma.playlist.findUnique({
      where: { id: dto.playlistId },
    });
  }

  async deleteSongFromPlaylist(dto: UpdatePlaylistSongsDto, userId: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        id: dto.playlistId,
      },
    });

    if (!playlist) throw new BadRequestException('Playlist not found');
    if (playlist.ownerId !== userId)
      throw new ForbiddenException('You are not the owner of this playlist');

    const song = await this.prisma.song.findUnique({
      where: {
        id: dto.songId,
      },
    });

    if (!song) throw new BadRequestException('Song not found');
    const existingPlaylistSong = await this.prisma.songsOnPlaylists.findMany({
      where: {
        playlistId: dto.playlistId,
        songId: dto.songId,
      },
    });

    if (existingPlaylistSong.length === 0)
      throw new BadRequestException('Song not on playlist');

    await this.prisma.songsOnPlaylists.deleteMany({
      where: {
        playlistId: dto.playlistId,
        songId: dto.songId,
      },
    });

    return await this.prisma.playlist.findUnique({
      where: { id: dto.playlistId },
    });
  }

  async deletePlaylist(playlistId: string, userId: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) throw new BadRequestException('Playlist not found');
    if (playlist.ownerId !== userId)
      throw new ForbiddenException('You are not the owner of this playlist');

    await this.prisma.songsOnPlaylists.deleteMany({
      where: {
        playlistId: playlistId,
      },
    });

    await this.prisma.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return true;
  }
}
