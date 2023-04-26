/*
 *
 * MIT License.
 *
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RolesRequired } from 'pyoraily-shared-backend/decorators/RolesRequiredDecorator';
import { JwtAuthGuard } from 'pyoraily-shared-backend/guards/AuthGuard';

import { UserRole } from 'pyoraily-shared-backend/model/user/UserRole';
import { AthleteProfile } from '@src/model/AthleteProfile';
import { Event } from '@src/model/Event';
import { AthleteProfileService } from '@src/services/AthleteProfileService';
import { Gender, User } from 'pyoraily-shared-backend/model/user/User';

@Controller('athlete-profile')
export class AthleteProfileController {
  constructor(private readonly athleteProfileService: AthleteProfileService) {}

  @UseGuards(JwtAuthGuard)
  @RolesRequired(UserRole.ATHLETE)
  @Get('/me/:year')
  async profile(@Req() request: { user: User }, @Param('year') year: number): Promise<AthleteProfile | null> {
    const athleteProfile = await this.athleteProfileService.findOneByUserIdAndYear(request.user.id, year);
    if (!athleteProfile) {
      const newAthleteProfile: AthleteProfile = {
        userID: request.user.id,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
        yearOfBirth: 0 as number,
        gender: Gender.NA,
        events: [],
        nominatedCategory: 'U17',
        nominatedDisciplines: [],
        year: year,
      };
      return this.athleteProfileService.create(newAthleteProfile);
    }
    return athleteProfile;
  }

  @UseGuards(JwtAuthGuard)
  @RolesRequired(UserRole.ATHLETE)
  @Post('/me/:year')
  async update(
    @Req() request: { user: User },
    @Param('year') year: number,
    @Body() athleteProfile: AthleteProfile
  ): Promise<AthleteProfile> {
    const newAthleteProfile: AthleteProfile = {
      ...athleteProfile,
      userID: request.user.id,
      year: year,
    };
    return this.athleteProfileService.update(newAthleteProfile.id as string, newAthleteProfile);
  }

  @UseGuards(JwtAuthGuard)
  @RolesRequired(UserRole.HPY)
  @Get(':year/:discipline/:category/:gender')
  async findAllByFilter(
    @Param('year') year: number,
    @Param('discipline') discipline: string,
    @Param('category') category: string,
    @Param('gender') gender: string
  ): Promise<AthleteProfile[]> {
    return this.athleteProfileService.findAllByFilter(year, discipline, category, gender);
  }

  @UseGuards(JwtAuthGuard)
  @RolesRequired(UserRole.HPY)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<AthleteProfile | null> {
    return this.athleteProfileService.findOneById(id);
  }
}
