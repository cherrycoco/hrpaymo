/*   psql -d postgres -a -f ./schema.sql    */
\connect template1;
DROP DATABASE IF EXISTS paymo;
CREATE DATABASE paymo;
\connect paymo;

CREATE TABLE USERS (
  id SERIAL PRIMARY KEY,
  username varchar(20) UNIQUE NOT NULL,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  verified BOOLEAN DEFAULT false,
  authy_id varchar(64),
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  phone varchar(11) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  email varchar(64) UNIQUE NOT NULL,
  avatar_url varchar(500)
);

CREATE TABLE USERS_TRANSACTIONS (
  txn_id SERIAL PRIMARY KEY,
  payer_id INT REFERENCES USERS(id), 
  payee_id INT REFERENCES USERS(id)
);

CREATE TABLE TRANSACTIONS (
  txn_id int PRIMARY KEY REFERENCES USERS_TRANSACTIONS(txn_id),
  amount NUMERIC(10,2),
  note VARCHAR(1000),
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BALANCE (
  user_id INT PRIMARY KEY REFERENCES USERS(id),
  amount NUMERIC(10,2)
);

CREATE TABLE MESSAGES (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES USERS(id) NOT NULL,
  receiver_id INT REFERENCES USERS(id) NOT NULL,
  chat VARCHAR(1000)
);

CREATE TABLE reactions (
  id SERIAL PRIMARY KEY,
  emoji text,
  description VARCHAR(100)
);

INSERT INTO reactions (emoji, description) VALUES ('🍺', 'beer mug');
INSERT INTO reactions (emoji, description) VALUES ('🍾', 'bottle with popping cork');
INSERT INTO reactions (emoji, description) VALUES ('🍷', 'wine glass');
INSERT INTO reactions (emoji, description) VALUES ('🍸', 'cocktail glass');
INSERT INTO reactions (emoji, description) VALUES ('🍹', 'tropical drink');
INSERT INTO reactions (emoji, description) VALUES ('🍻', 'beer mugs');
INSERT INTO reactions (emoji, description) VALUES ('🥂', 'glasses');
INSERT INTO reactions (emoji, description) VALUES ('🥃', 'beer ');
INSERT INTO reactions (emoji, description) VALUES ('🍦', 'soft ice cream');
INSERT INTO reactions (emoji, description) VALUES ('🍨', 'ice cream');
INSERT INTO reactions (emoji, description) VALUES ('🍩', 'doughnut');
INSERT INTO reactions (emoji, description) VALUES ('🍪', 'cookie');
INSERT INTO reactions (emoji, description) VALUES ('🎂', 'cake');
INSERT INTO reactions (emoji, description) VALUES ('🍰', 'shortcake');
INSERT INTO reactions (emoji, description) VALUES ('🥧', 'pie');
INSERT INTO reactions (emoji, description) VALUES ('🍫', 'chocolate bar');
INSERT INTO reactions (emoji, description) VALUES ('🍬', 'candy');
INSERT INTO reactions (emoji, description) VALUES ('🍯', 'honey pot');
INSERT INTO reactions (emoji, description) VALUES ('☕', 'coffee');
INSERT INTO reactions (emoji, description) VALUES ('🥛', 'milk');
INSERT INTO reactions (emoji, description) VALUES ('🔪', 'knife');
INSERT INTO reactions (emoji, description) VALUES ('⛰', 'mountain');
INSERT INTO reactions (emoji, description) VALUES ('🌋', 'volcano');
INSERT INTO reactions (emoji, description) VALUES ('🏕', 'camping');
INSERT INTO reactions (emoji, description) VALUES ('🏖', 'beach');
INSERT INTO reactions (emoji, description) VALUES ('🏜', 'desert');
INSERT INTO reactions (emoji, description) VALUES ('🏞', 'national park');
INSERT INTO reactions (emoji, description) VALUES ('🏟', 'stadium');
INSERT INTO reactions (emoji, description) VALUES ('🏗', 'construction');
INSERT INTO reactions (emoji, description) VALUES ('🏘', 'houses');
INSERT INTO reactions (emoji, description) VALUES ('🏠', 'house');
INSERT INTO reactions (emoji, description) VALUES ('🏥', 'hospital');
INSERT INTO reactions (emoji, description) VALUES ('🏦', 'bank');
INSERT INTO reactions (emoji, description) VALUES ('🏨', 'hotel');
INSERT INTO reactions (emoji, description) VALUES ('🏩', 'love hotel');
INSERT INTO reactions (emoji, description) VALUES ('🏫', 'school');
INSERT INTO reactions (emoji, description) VALUES ('🏬', 'store');
INSERT INTO reactions (emoji, description) VALUES ('🏰', 'castle');
INSERT INTO reactions (emoji, description) VALUES ('💒', 'wedding');
INSERT INTO reactions (emoji, description) VALUES ('🗽', 'statue of liberty');
INSERT INTO reactions (emoji, description) VALUES ('⛪', 'church');
INSERT INTO reactions (emoji, description) VALUES ('🕌', 'mosque');
INSERT INTO reactions (emoji, description) VALUES ('⛺', 'tent');
INSERT INTO reactions (emoji, description) VALUES ('🎢', 'amusement park');
INSERT INTO reactions (emoji, description) VALUES ('💈', 'barber');
INSERT INTO reactions (emoji, description) VALUES ('🎪', 'circus');
INSERT INTO reactions (emoji, description) VALUES ('🎰', 'casino');
INSERT INTO reactions (emoji, description) VALUES ('🚇', 'metro');
INSERT INTO reactions (emoji, description) VALUES ('🚆', 'train');
INSERT INTO reactions (emoji, description) VALUES ('🚌', 'bus');
INSERT INTO reactions (emoji, description) VALUES ('🚑', 'ambulance');
INSERT INTO reactions (emoji, description) VALUES ('🚒', 'fire truck');
INSERT INTO reactions (emoji, description) VALUES ('🚓', 'police car');
INSERT INTO reactions (emoji, description) VALUES ('🚕', 'taxi');
INSERT INTO reactions (emoji, description) VALUES ('🚗', 'automobile');
INSERT INTO reactions (emoji, description) VALUES ('🚗', 'car');
INSERT INTO reactions (emoji, description) VALUES ('🚲', 'bicycle');
INSERT INTO reactions (emoji, description) VALUES ('🛴', 'scoote');
INSERT INTO reactions (emoji, description) VALUES ('⛽', 'gas');
INSERT INTO reactions (emoji, description) VALUES ('⛽', 'fuel');
INSERT INTO reactions (emoji, description) VALUES ('⛵', 'sailing');
INSERT INTO reactions (emoji, description) VALUES ('🛶', 'canoe');
INSERT INTO reactions (emoji, description) VALUES ('⛴', 'ferry');
INSERT INTO reactions (emoji, description) VALUES ('🚢', 'ship');
INSERT INTO reactions (emoji, description) VALUES ('🏗', 'construction');
INSERT INTO reactions (emoji, description) VALUES ('✈', 'plane');
INSERT INTO reactions (emoji, description) VALUES ('✈', 'airplane');
INSERT INTO reactions (emoji, description) VALUES ('🚁', 'helicopter');
INSERT INTO reactions (emoji, description) VALUES ('🛏', 'bed');
INSERT INTO reactions (emoji, description) VALUES ('🚿', 'shower');
INSERT INTO reactions (emoji, description) VALUES ('⌚', 'time');
INSERT INTO reactions (emoji, description) VALUES ('⌚', 'watch');
INSERT INTO reactions (emoji, description) VALUES ('☀', 'sun');
INSERT INTO reactions (emoji, description) VALUES ('⭐', 'star');
INSERT INTO reactions (emoji, description) VALUES ('☁', 'cloud');
INSERT INTO reactions (emoji, description) VALUES ('🌈', 'rainbow');
INSERT INTO reactions (emoji, description) VALUES ('🌂', 'umbrella');
INSERT INTO reactions (emoji, description) VALUES ('❄', 'snowflake');
INSERT INTO reactions (emoji, description) VALUES ('⛄', 'snowman');
INSERT INTO reactions (emoji, description) VALUES ('🔥', 'fire');
INSERT INTO reactions (emoji, description) VALUES ('💧', 'water');
INSERT INTO reactions (emoji, description) VALUES ('🎃', 'halloween');
INSERT INTO reactions (emoji, description) VALUES ('🎄', 'christmas tree');
INSERT INTO reactions (emoji, description) VALUES ('🎈', 'birthday');
INSERT INTO reactions (emoji, description) VALUES ('🎈', 'balloon');
INSERT INTO reactions (emoji, description) VALUES ('🎆', 'fireworks');
INSERT INTO reactions (emoji, description) VALUES ('🎁', 'present');
INSERT INTO reactions (emoji, description) VALUES ('🎟', 'movie');
INSERT INTO reactions (emoji, description) VALUES ('🏆', 'trophy');
INSERT INTO reactions (emoji, description) VALUES ('⚽', 'soccery');
INSERT INTO reactions (emoji, description) VALUES ('⚾', 'baseball');
INSERT INTO reactions (emoji, description) VALUES ('🏀', 'basketball');
INSERT INTO reactions (emoji, description) VALUES ('🏐', 'volleyball');
INSERT INTO reactions (emoji, description) VALUES ('🏈', 'football');
INSERT INTO reactions (emoji, description) VALUES ('🎾', 'tennis');
INSERT INTO reactions (emoji, description) VALUES ('🎱', 'pool');
INSERT INTO reactions (emoji, description) VALUES ('🎳', 'bowling');
INSERT INTO reactions (emoji, description) VALUES ('🏏', 'cricket');
INSERT INTO reactions (emoji, description) VALUES ('🏒', 'hockey');
INSERT INTO reactions (emoji, description) VALUES ('🏓', 'ping pong');
INSERT INTO reactions (emoji, description) VALUES ('🥊', 'boxing');
INSERT INTO reactions (emoji, description) VALUES ('🥋', 'karate');
INSERT INTO reactions (emoji, description) VALUES ('🎯', 'darts');
INSERT INTO reactions (emoji, description) VALUES ('⛳', 'golf');
INSERT INTO reactions (emoji, description) VALUES ('⛸', 'skating');
INSERT INTO reactions (emoji, description) VALUES ('🎣', 'fishing');
INSERT INTO reactions (emoji, description) VALUES ('🎿', 'skiing');
INSERT INTO reactions (emoji, description) VALUES ('🛷', 'sledding');
INSERT INTO reactions (emoji, description) VALUES ('🥌', 'curling');
INSERT INTO reactions (emoji, description) VALUES ('🎮', 'video game');
INSERT INTO reactions (emoji, description) VALUES ('♠', 'cards');
INSERT INTO reactions (emoji, description) VALUES ('🎲', 'gamble');
INSERT INTO reactions (emoji, description) VALUES ('🎵', 'music');
INSERT INTO reactions (emoji, description) VALUES ('🎧', 'headphone');
INSERT INTO reactions (emoji, description) VALUES ('🎷🎸🥁', 'music concert');
INSERT INTO reactions (emoji, description) VALUES ('📻', 'radio');
INSERT INTO reactions (emoji, description) VALUES ('📱', 'phone');
INSERT INTO reactions (emoji, description) VALUES ('🔋', 'battery');
INSERT INTO reactions (emoji, description) VALUES ('💻', 'computer');
INSERT INTO reactions (emoji, description) VALUES ('💾', 'save');
INSERT INTO reactions (emoji, description) VALUES ('🎥', 'camera ');
INSERT INTO reactions (emoji, description) VALUES ('🎞', 'film');
INSERT INTO reactions (emoji, description) VALUES ('📷', 'camera');
INSERT INTO reactions (emoji, description) VALUES ('🔦', 'flashlight');
INSERT INTO reactions (emoji, description) VALUES ('💡', 'diea');
INSERT INTO reactions (emoji, description) VALUES ('📚', 'books');
INSERT INTO reactions (emoji, description) VALUES ('💰', 'cash');
INSERT INTO reactions (emoji, description) VALUES ('💵', 'dollars');
INSERT INTO reactions (emoji, description) VALUES ('💶', 'euros');
INSERT INTO reactions (emoji, description) VALUES ('💳', 'credit card');
INSERT INTO reactions (emoji, description) VALUES ('🏹', 'bow and arrow');
INSERT INTO reactions (emoji, description) VALUES ('🗡', 'sword');
INSERT INTO reactions (emoji, description) VALUES ('🛡', 'shield');
INSERT INTO reactions (emoji, description) VALUES ('🗡🛡', 'protection');
INSERT INTO reactions (emoji, description) VALUES ('💊', 'pill');
INSERT INTO reactions (emoji, description) VALUES ('🚬', 'cigarettes');
INSERT INTO reactions (emoji, description) VALUES ('⚰', 'funeral');
INSERT INTO reactions (emoji, description) VALUES ('🛒', 'shopping');
INSERT INTO reactions (emoji, description) VALUES ('💯', 'hundred');
INSERT INTO reactions (emoji, description) VALUES ("🏳️‍🌈", 'rainbow flag');
INSERT INTO reactions (emoji, description) VALUES ('🇦🇷', 'argentina');
INSERT INTO reactions (emoji, description) VALUES ('🇪🇨', 'ecuador');
INSERT INTO reactions (emoji, description) VALUES ('🇫🇷', 'france');
INSERT INTO reactions (emoji, description) VALUES ('🇬🇧', 'united kingdom');
INSERT INTO reactions (emoji, description) VALUES ('🇺🇸', 'america');
INSERT INTO reactions (emoji, description) VALUES ('🇺🇸', 'united states');
INSERT INTO reactions (emoji, description) VALUES ('🧗', 'rock climbing');
INSERT INTO reactions (emoji, description) VALUES ('🧘', 'meditation');
INSERT INTO reactions (emoji, description) VALUES ('🛀', 'bath');
INSERT INTO reactions (emoji, description) VALUES ('🏋️‍♂️,', 'strength');
INSERT INTO reactions (emoji, description) VALUES ('🏃', 'running');
INSERT INTO reactions (emoji, description) VALUES ('🚶', 'walking');
INSERT INTO reactions (emoji, description) VALUES ('💇','haircut');
INSERT INTO reactions (emoji, description) VALUES ('💆','massage');
INSERT INTO reactions (emoji, description) VALUES ('🤷', 'shrug');
INSERT INTO reactions (emoji, description) VALUES ('🤦' 'facepalm');
INSERT INTO reactions (emoji, description) VALUES ('🙅', 'no gesture');
INSERT INTO reactions (emoji, description) VALUES ('🤒', 'sick');
INSERT INTO reactions (emoji, description) VALUES ('🤕', 'injured');
INSERT INTO reactions (emoji, description) VALUES ('🤮', 'vomit');
INSERT INTO reactions (emoji, description) VALUES ('🤧', 'sneeze');
INSERT INTO reactions (emoji, description) VALUES ('🤥', 'lying');
INSERT INTO reactions (emoji, description) VALUES ('🤭', 'omg');
INSERT INTO reactions (emoji, description) VALUES ('😠', 'angry');
INSERT INTO reactions (emoji, description) VALUES ('😵', 'dizzy');
INSERT INTO reactions (emoji, description) VALUES ('😰', 'anxious');
INSERT INTO reactions (emoji, description) VALUES ('🤯', 'mind blown');
INSERT INTO reactions (emoji, description) VALUES ('😭', 'lmao');
INSERT INTO reactions (emoji, description) VALUES ('😢', 'crying');
INSERT INTO reactions (emoji, description) VALUES ('😟', 'worried');
INSERT INTO reactions (emoji, description) VALUES ('☹', 'frown');
INSERT INTO reactions (emoji, description) VALUES ('😕', 'confused');
INSERT INTO reactions (emoji, description) VALUES ('😴', 'sleep');
INSERT INTO reactions (emoji, description) VALUES ('🤐', 'silent');
INSERT INTO reactions (emoji, description) VALUES ('😏', 'smirk');
INSERT INTO reactions (emoji, description) VALUES ('😑', 'expressionless');
INSERT INTO reactions (emoji, description) VALUES ('😐', 'neutral');
INSERT INTO reactions (emoji, description) VALUES ('🤔', 'thinking');
INSERT INTO reactions (emoji, description) VALUES ('🤩', 'star struck');
INSERT INTO reactions (emoji, description) VALUES ('🤗', 'hands');
INSERT INTO reactions (emoji, description) VALUES ('🤗', 'hugging');
INSERT INTO reactions (emoji, description) VALUES ('🙂', 'smile');
INSERT INTO reactions (emoji, description) VALUES ('😚', 'kiss');
INSERT INTO reactions (emoji, description) VALUES ('😘', 'kiss');
INSERT INTO reactions (emoji, description) VALUES ('😍', 'love');
INSERT INTO reactions (emoji, description) VALUES ('😎', 'cool');
INSERT INTO reactions (emoji, description) VALUES ('🤣', 'rofl');
INSERT INTO reactions (emoji, description) VALUES ('😉', 'wink');
INSERT INTO reactions (emoji, description) VALUES ('👉', 'poke');
INSERT INTO reactions (emoji, description) VALUES ('🤞', 'crossed fingers');
INSERT INTO reactions (emoji, description) VALUES ('✌', 'peace');
INSERT INTO reactions (emoji, description) VALUES ('👇', 'down');
INSERT INTO reactions (emoji, description) VALUES ('🖕', 'middle finger');
INSERT INTO reactions (emoji, description) VALUES ('🤘', 'sign of the horns');
INSERT INTO reactions (emoji, description) VALUES ('🖐', 'hand');
INSERT INTO reactions (emoji, description) VALUES ('👌', 'ok hand');
INSERT INTO reactions (emoji, description) VALUES ('👍', 'thumbs up');
INSERT INTO reactions (emoji, description) VALUES ('👎', 'thumbs down');
INSERT INTO reactions (emoji, description) VALUES ('✊', 'raised fist');
INSERT INTO reactions (emoji, description) VALUES ('👊', 'pound');
INSERT INTO reactions (emoji, description) VALUES ('👋', 'waving hand');
INSERT INTO reactions (emoji, description) VALUES ('👐', 'open hands');
INSERT INTO reactions (emoji, description) VALUES ('👏', 'clapping hands');
INSERT INTO reactions (emoji, description) VALUES ('🤝', 'handshake');
INSERT INTO reactions (emoji, description) VALUES ('💅', 'nails');
INSERT INTO reactions (emoji, description) VALUES ('❤', 'love');
INSERT INTO reactions (emoji, description) VALUES ('💍', 'ring');
INSERT INTO reactions (emoji, description) VALUES ('💐', 'flowers');
INSERT INTO reactions (emoji, description) VALUES ('👌', 'ok hand');
INSERT INTO reactions (emoji, description) VALUES ('👍', 'thumbs up');
INSERT INTO reactions (emoji, description) VALUES ('👎', 'thumbs down');
INSERT INTO reactions (emoji, description) VALUES ('✊', 'raised fist');
INSERT INTO reactions (emoji, description) VALUES ('👊', 'pound');
INSERT INTO reactions (emoji, description) VALUES ('👋', 'waving hand');
INSERT INTO reactions (emoji, description) VALUES ("👐", 'open hands');
INSERT INTO reactions (emoji, description) VALUES ('👏', 'clapping hands');
INSERT INTO reactions (emoji, description) VALUES ("🤝", 'handshake');
INSERT INTO reactions (emoji, description) VALUES ('💅', 'nails');
INSERT INTO reactions (emoji, description) VALUES ('❤', 'love');
INSERT INTO reactions (emoji, description) VALUES ('💍', 'ring');
INSERT INTO reactions (emoji, description) VALUES ('💐', 'flowers');
INSERT INTO reactions (emoji, description) VALUES ('🌲', 'tree');
INSERT INTO reactions (emoji, description) VALUES ('🍁', 'canada');
INSERT INTO reactions (emoji, description) VALUES ('🍇🍊🍋', 'fruit');
INSERT INTO reactions (emoji, description) VALUES ('🍌', 'banana');
INSERT INTO reactions (emoji, description) VALUES ('🍍', 'pineapple');
INSERT INTO reactions (emoji, description) VALUES ('🍎', 'apple');
INSERT INTO reactions (emoji, description) VALUES ('🍐', 'pear');
INSERT INTO reactions (emoji, description) VALUES ('🍑', 'peach');
INSERT INTO reactions (emoji, description) VALUES ('🍒', 'cherries');
INSERT INTO reactions (emoji, description) VALUES ('🍓', 'strawberry');
INSERT INTO reactions (emoji, description) VALUES ('🍆', 'eggplant');
INSERT INTO reactions (emoji, description) VALUES ('🥥', 'coconut');
INSERT INTO reactions (emoji, description) VALUES ('🥝', 'kiwi');
INSERT INTO reactions (emoji, description) VALUES ("🌽", 'corn');
INSERT INTO reactions (emoji, description) VALUES ('🥦🥕🥒', 'vegetable');
INSERT INTO reactions (emoji, description) VALUES ('🥜', 'nuts');
INSERT INTO reactions (emoji, description) VALUES ('🍞', 'bread');
INSERT INTO reactions (emoji, description) VALUES ('🥞', 'pancakes');
INSERT INTO reactions (emoji, description) VALUES ('🧀', 'cheese');
INSERT INTO reactions (emoji, description) VALUES ('🍖', 'meat');
INSERT INTO reactions (emoji, description) VALUES ('🥓', 'bacon');
INSERT INTO reactions (emoji, description) VALUES ('🍔', 'burger');
INSERT INTO reactions (emoji, description) VALUES ('🍟', 'fries');
INSERT INTO reactions (emoji, description) VALUES ('🍕', 'pizza');
INSERT INTO reactions (emoji, description) VALUES ('🌭', 'hot dog');
INSERT INTO reactions (emoji, description) VALUES ('🥪', 'sandwich');
INSERT INTO reactions (emoji, description) VALUES ('🌮', 'taco');
INSERT INTO reactions (emoji, description) VALUES ('🌯', 'burrito');
INSERT INTO reactions (emoji, description) VALUES ('🥚', 'egg');
INSERT INTO reactions (emoji, description) VALUES ('🥚🥞', 'brunch');
INSERT INTO reactions (emoji, description) VALUES ('🥗', 'salad');
INSERT INTO reactions (emoji, description) VALUES ('🍲', 'dinner');
INSERT INTO reactions (emoji, description) VALUES ('🍿', 'popcorn');
INSERT INTO reactions (emoji, description) VALUES ('🍝', 'spaghetti');
INSERT INTO reactions (emoji, description) VALUES ('🍝', 'pasta');
INSERT INTO reactions (emoji, description) VALUES ('🍣', 'sushi');
INSERT INTO reactions (emoji, description) VALUES ('🍤', 'shrimp');
INSERT INTO reactions (emoji, description) VALUES ('🥟', 'dumpling');
INSERT INTO reactions (emoji, description) VALUES ('🥡', 'takeout');
INSERT INTO reactions (emoji, description) VALUES ('🥫', 'canned food');
INSERT INTO reactions (emoji, description) VALUES ('🍱', 'bento box');
INSERT INTO reactions (emoji, description) VALUES ('🍛', 'lunch');
INSERT INTO reactions (emoji, description) VALUES ('🍼', 'baby bottle');
INSERT INTO reactions (emoji, description) VALUES ('💧💵', 'water bill');
INSERT INTO reactions (emoji, description) VALUES ('⛽💵', 'gas bill');
INSERT INTO reactions (emoji, description) VALUES ('🏠💲', 'rent');
INSERT INTO reactions (emoji, description) VALUES ('🚰', 'utilities'); 
INSERT INTO reactions (emoji, description) VALUES ('🗑', 'trash'); 
INSERT INTO reactions (emoji, description) VALUES ('🍻🥂', 'drinks');






