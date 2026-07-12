import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class ScrapRule extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  diameter: number; // e.g., 8, 10, 12, 16, 20, 25, 32

  @Prop({ required: true, default: 1000 })
  scrapLengthThreshold: number; // mm. Leftovers shorter than this are scrap, >= this are remnants.
}

export const ScrapRuleSchema = SchemaFactory.createForClass(ScrapRule);
ScrapRuleSchema.index({ companyId: 1, diameter: 1 }, { unique: true });
