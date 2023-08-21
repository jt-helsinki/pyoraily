/*
 *
 * MIT License.
 *
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@src/model/Result';
import { Document } from 'mongoose';
import { DisciplineType } from 'pyoraily-shared-backend/model/types';

export const EVENT_SCHEMA_NAME = 'Event';

export interface Event {
  id?: string;
  name: string;
  discipline: DisciplineType;
  country: string;
  category: string;
  eventClass: string;
  eventDate: Date;
  notes: string;
  results: Result[];
}

@Schema()
export class EventDocument extends Document implements Event {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  discipline: DisciplineType;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  eventClass: string;

  @Prop({ type: Date, required: true })
  eventDate: Date;

  @Prop({ type: String })
  notes: string;

  @Prop({
    type: [ResultSchema],
    default: [],
  })
  results: Result[];
}

export const EventSchema = SchemaFactory.createForClass(EventDocument);

// Modify toJSON to include the virtual field and remove _id
EventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
