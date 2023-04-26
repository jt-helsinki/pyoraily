/*
 *
 * MIT License.
 *
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Result, ResultSchema } from '@src/model/Result';
import { Document } from 'mongoose';

export const EVENT_SCHEMA_NAME = 'Event';

export interface Event {
  id?: string;
  name: string;
  discipline: string;
  country: string;
  category: string;
  eventClass: string;
  eventDate: Date;
  notes: string;
}

@Schema()
export class EventDocument extends Document implements Event {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  discipline: string;

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

// Add virtual id field to the schema
EventSchema.virtual('id').get(function (this: EventDocument) {
  return this._id.toHexString();
});

// Modify toJSON to include the virtual field and remove _id
EventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});
