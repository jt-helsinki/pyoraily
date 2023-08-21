/*
 *
 * MIT License.
 *
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventSchema } from '@src/model/Event';
import { Document } from 'mongoose';
import { Event } from '@src/model/Event';
import { Gender } from 'pyoraily-shared-backend/model/user/User';

export const ATHLETE_PROFILE_SCHEMA_NAME = 'AthleteProfile';

export interface AthleteProfile {
  _id?: string;
  id?: string;
  userID: string;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  gender: Gender;
  year: number;
  nominatedCategory: string;
  nominatedDisciplines: string[];
  events: Event[];
}

@Schema()
export class AthleteProfileDocument extends Document implements AthleteProfile {
  @Prop({ type: String, required: true, index: true })
  userID: string;

  @Prop({ type: Number, required: true, index: true })
  year: number;

  @Prop({ type: String, required: true, index: true })
  gender: Gender;

  @Prop({ type: Number, required: true, index: true })
  yearOfBirth: number;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, index: true })
  nominatedCategory: string;

  @Prop({ type: [String], default: [], index: true })
  nominatedDisciplines: string[];

  @Prop({ type: [EventSchema], default: [] })
  events: Event[];
}

export const AthleteProfileSchema = SchemaFactory.createForClass(AthleteProfileDocument);

// Add virtual id field to the schema
AthleteProfileSchema.virtual('id').get(function (this: AthleteProfileDocument) {
  return this._id.toHexString();
});

// Modify toJSON to include the virtual field and remove _id
AthleteProfileSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
