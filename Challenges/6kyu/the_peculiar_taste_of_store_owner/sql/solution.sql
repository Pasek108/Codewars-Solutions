-- provide your SQL
SELECT 
  actor.actor_id, 
  CONCAT(actor.first_name, ' ', actor.last_name) AS full_name,
  film.title as film_title
FROM (
  SELECT actor.actor_id, MAX(film.film_id) as film_id
  FROM film_actor 
  INNER JOIN film ON film_actor.film_id = film.film_id
  INNER JOIN actor ON film_actor.actor_id = actor.actor_id
  GROUP BY actor.actor_id
  ORDER BY actor.actor_id ASC
) AS recent_films,
film_actor
INNER JOIN film ON film_actor.film_id = film.film_id
INNER JOIN actor ON film_actor.actor_id = actor.actor_id
WHERE actor.first_name LIKE 'J%' AND film.film_id=recent_films.film_id AND actor.actor_id=recent_films.actor_id
ORDER BY actor.actor_id ASC