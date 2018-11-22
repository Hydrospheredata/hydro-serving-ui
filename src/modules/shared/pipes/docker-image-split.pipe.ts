import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDockerImage',
})
export class DockerImageSplitPipe implements PipeTransform {
  transform(imageName: string, part: string) {
    return imageName.split('/')[['repository', 'name'].indexOf(part)];
  }
}
