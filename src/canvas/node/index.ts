import {Color} from '../color.js';
import {Frame, LabelPosition} from '../frame.js';
import Structure from '../structure.js';

class Node extends Structure {
  value: number;
  color: string;
  corners: number;
  label: Partial<Record<LabelPosition, string>>;

  static WIDTH = 60;
  static HEIGHT = 30;

  constructor(value = 0) {
    super();

    this.color = Color.Transparent;
    this.corners = 0b1111;
    this.value = value;
    this.label = {};
  }

  toFrame(frame?: Frame): Frame {
    frame = super.toFrame(frame);

    frame.nodes.push({
      x: this.x,
      y: this.y,
      value: this.value,
      color: this.color,
      corners: this.corners,
      opacity: this.opacity,
    });

    Object.values(LabelPosition).forEach(position => {
      const label = this.label[position];

      if (label) {
        frame.labels.push({
          nodePosition: {x: this.x, y: this.y},
          position: position,
          text: label,
          opacity: this.opacity,
        });
      }
    });

    return frame;
  }
}

export default Node;
