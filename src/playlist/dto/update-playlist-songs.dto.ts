import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaylistSongsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  songId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  playlistId: string;
}
