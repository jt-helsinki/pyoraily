/*
 *
 * MIT License.
 *
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export const RESULT_SCHEMA_NAME = 'Result';

export interface Result {
  id?: string;
  placing: number;
  distance: number;
  distanceUnit: 'km' | 'laps' | 'm';
  courseProfile: string;
  numberOfStarters: number;
  numberOfFinishers: number;
  timeBehind: string;
  resultDate: Date;
  raceType: string;
  notes: string;
}

@Schema()
export class ResultDocument extends Document implements Result {
  @Prop({ type: Number, required: true })
  placing: number;

  @Prop({ type: Number, required: true })
  distance: number;

  @Prop({ type: String, required: true })
  distanceUnit: 'km' | 'laps' | 'm';

  @Prop({ type: Number, required: true })
  numberOfStarters: number;

  @Prop({ type: String, required: true })
  courseProfile: string;

  @Prop({ type: Number, required: true })
  numberOfFinishers: number;

  @Prop({ type: String, required: true })
  timeBehind: string;

  @Prop({ type: Date, required: true })
  resultDate: Date;

  @Prop({ type: String, required: true })
  raceType: string;

  @Prop({ type: String })
  notes: string;
}

export const ResultSchema = SchemaFactory.createForClass(ResultDocument);
