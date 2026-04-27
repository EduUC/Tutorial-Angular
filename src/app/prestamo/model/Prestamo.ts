import { Client } from '../../client/model/client';
import { Game } from '../../game/model/Game';

export class Prestamo {
  id!: number;
  client!: Client;
  game!: Game;
  startDate!: Date;
  endDate!: Date;
}
