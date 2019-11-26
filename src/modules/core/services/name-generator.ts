import { Injectable } from '@angular/core';
import {
  uniqueNamesGenerator,
  UniqueNamesGeneratorConfig,
} from 'unique-names-generator';

@Injectable()
export class NameGenerator {
  private get config(): UniqueNamesGeneratorConfig {
    return {
      separator: '_',
      length: 2,
    };
  }

  generate(): string {
    return uniqueNamesGenerator(this.config);
  }
}
