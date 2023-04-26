/*
 *
 * MIT License.
 *
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ATHLETE_PROFILE_SCHEMA_NAME, AthleteProfile } from '@src/model/AthleteProfile';
import { Model } from 'mongoose';

@Injectable()
export class AthleteProfileService {
  constructor(
    @InjectModel(ATHLETE_PROFILE_SCHEMA_NAME)
    private readonly athleteProfileSchema: Model<AthleteProfile>
  ) {}

  async create(athleteProfile: AthleteProfile): Promise<AthleteProfile> {
    return this.athleteProfileSchema.create(athleteProfile);
  }

  async findAllByFilter(year: number, discipline: string, category: string, gender: string): Promise<AthleteProfile[]> {
    const query: any = {};
    if (year) query.year = year;
    if (discipline) query.nominatedDisciplines = { $in: [discipline] };
    if (category) query.nominatedCategory = category;
    if (gender) query.gender = gender;
    return this.athleteProfileSchema.find(query).exec();
  }

  async findOneById(id: string): Promise<AthleteProfile | null> {
    return this.athleteProfileSchema.findById(id).exec();
  }

  async findOneByUserIdAndYear(userId: string, year: number): Promise<AthleteProfile | null> {
    return this.athleteProfileSchema.findOne({ userID: userId, year: year }).exec();
  }

  async update(id: string | null, athleteProfile: AthleteProfile): Promise<AthleteProfile> {
    const newAthleteProfile: AthleteProfile = {
      ...athleteProfile,
    };
    delete (newAthleteProfile as any)._id;

    const updatedAthleteProfile = await this.athleteProfileSchema
      .findByIdAndUpdate(id, newAthleteProfile, { upsert: true, new: true })
      .exec();

    if (!updatedAthleteProfile) {
      throw new Error(`Unable to update AthleteProfile with id: ${id}`);
    }

    return updatedAthleteProfile.toJSON() as AthleteProfile;
  }
}
