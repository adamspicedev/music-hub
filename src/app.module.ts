import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistService } from './artist/artist.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/gaurds';
import { PrismaModule } from './prisma/prisma.module';
import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArtistModule,
    AuthModule,
    PrismaModule,
    SongModule,
    AlbumModule,
    PlaylistModule,
  ],
  controllers: [AppController, ArtistController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
    ArtistService,
  ],
})
export class AppModule {}
