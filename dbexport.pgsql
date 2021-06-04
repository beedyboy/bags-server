--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    username character varying(30),
    address text,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    phone character varying(50),
    roles json,
    "hasRoles" boolean DEFAULT false,
    token text,
    status text DEFAULT 'Active'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT accounts_status_check CHECK ((status = ANY (ARRAY['Active'::text, 'Pending'::text, 'Deleted'::text, 'Banned'::text])))
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(50),
    description text,
    status text DEFAULT 'Active'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT brands_status_check CHECK ((status = ANY (ARRAY['Active'::text, 'Pending'::text, 'Deleted'::text])))
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO postgres;

--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    category character varying(100),
    sub_id integer,
    brand_id integer,
    product_name character varying(50),
    description text,
    status text DEFAULT 'Active'::text,
    images text[],
    has_name boolean DEFAULT false,
    branded boolean DEFAULT false,
    best boolean DEFAULT false,
    arrival boolean DEFAULT false,
    featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT products_status_check CHECK ((status = ANY (ARRAY['Active'::text, 'Pending'::text, 'Deleted'::text])))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reconcillations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reconcillations (
    id integer NOT NULL,
    value_date character varying(30) NOT NULL,
    remarks text,
    credit_amount real NOT NULL,
    amount_used real,
    balance real,
    customer character varying(50),
    approved_one boolean DEFAULT false,
    approved_two boolean DEFAULT false,
    approval_one integer,
    approval_two integer,
    reference character varying(30),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.reconcillations OWNER TO postgres;

--
-- Name: reconcillations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reconcillations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reconcillations_id_seq OWNER TO postgres;

--
-- Name: reconcillations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reconcillations_id_seq OWNED BY public.reconcillations.id;


--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying(50),
    slug character varying(50),
    category character varying(100),
    description text,
    status text DEFAULT 'Active'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT subcategories_status_check CHECK ((status = ANY (ARRAY['Active'::text, 'Pending'::text, 'Deleted'::text])))
);


ALTER TABLE public.subcategories OWNER TO postgres;

--
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategories_id_seq OWNER TO postgres;

--
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribers (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    status text DEFAULT 'Active'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT subscribers_status_check CHECK ((status = ANY (ARRAY['Active'::text, 'Pending'::text, 'Deleted'::text])))
);


ALTER TABLE public.subscribers OWNER TO postgres;

--
-- Name: subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribers_id_seq OWNER TO postgres;

--
-- Name: subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribers_id_seq OWNED BY public.subscribers.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reconcillations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reconcillations ALTER COLUMN id SET DEFAULT nextval('public.reconcillations_id_seq'::regclass);


--
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- Name: subscribers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers ALTER COLUMN id SET DEFAULT nextval('public.subscribers_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, firstname, lastname, username, address, email, password, phone, roles, "hasRoles", token, status, created_at, updated_at) FROM stdin;
1	Bolade	Akinniyi	beedyboy	Lagos	boladebode@gmail.com
	$2a$10$QzBBNQALPeKKN2LjX8m7teqpmVirD08.2o0jerNKw4trNJ5rHEnZK
    	07037351836
        	{"brands":{"add":false,"view":true,"del":true},"category":{"add":true,"view":true,"del":true},
"company":{"manage":true},"subscribers":{"add":true,"view":true,"del":true},
"product":{"add":true,"view":true,"del":true},
"staff":{"add":true,"view":true,"del":true,"modify":true},
"reconcillation":{"del":true,"approval_one":true,"approval_two":false,"modify":true,"upload":true,"report":true},"report":{"manage":true}}
	t	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyMzYyMjEwfQ.rB3HN-uXX9I9McZ88LnjSo1lp2gVVbV9hN7SJt0qyIc
    	Active	2021-05-25 14:46:18.653698+01	2021-05-25 14:46:18.653698+01
2	Tolulope	Odeyemi			to.odeyemi@gmail.com	$2a$10$hejiON1r2dId41k2sMGTbuiTdvRETz4sJrpb9XAwGFabPzSbJ9tN6	876568	{"brands":{"add":true,"view":true,"del":true},"category":{"add":false,"view":true,"del":true},"company":{"manage":false},"subscribers":{"add":true,"view":true,"del":false},"product":{"add":false,"view":false,"del":false},"staff":{"add":false,"view":false,"del":false,"modify":false},"reconcillation":{"del":false,"approval_one":false,"approval_two":true,"modify":false,"upload":false,"report":false},"report":{"manage":false}}	t	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyMzczMzg5fQ.GQ63kyJDM218myudNh27TAy0e1fbf0ab_mBtyzIhfAU	Active	2021-05-25 15:01:04.382415+01	2021-05-25 15:01:04.382415+01
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, description, status, created_at, updated_at) FROM stdin;
1	Luis Vuitton	All kinds of Luis Vuitton for your perusal	Active	2021-05-25 14:47:11.109693+01	2021-05-25 14:47:11.109693+01
2	Puma	All kinds of Puma products for your perusal	Active	2021-05-25 14:47:38.53415+01	2021-05-25 14:47:38.53415+01
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20210516132020_init.js	1	2021-05-25 14:45:47.464+01
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, category, sub_id, brand_id, product_name, description, status, images, has_name, branded, best, arrival, featured, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: reconcillations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reconcillations (id, value_date, remarks, credit_amount, amount_used, balance, customer, approved_one, approved_two, approval_one, approval_two, reference, created_at, updated_at) FROM stdin;
3	07-05-2021	Transfer between Me and You Ref S5426899227-MAY-2021	25000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
4	07-05-2021	Transfer between Me and You Ref S5417899224-MAY-2021	8000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
5	07-05-2021	Transfer between Me and You Ref S5417890024-MAY-2021	43000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
6	07-05-2021	Transfer between Me and You Ref S5413499224-MAY-2021	10000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
7	07-05-2021	Transfer between Me and You Ref S5474183224-MAY-2021	15300	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
8	07-05-2021	Transfer between Me and You Ref S5426742224-MAY-2021	14000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
9	07-05-2021	Transfer between Me and You Ref S5417899227-MAY-2021	18000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
10	07-05-2021	Transfer between Me and You Ref S5417809227-MAY-2021	9000	\N	\N	\N	f	f	\N	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
2	07-05-2021	Transfer between Me and You Ref S5417899224-MAY-2021	10000	\N	\N	\N	t	f	1	\N	\N	2021-05-30 11:26:22.615535+01	2021-05-30 11:26:22.615535+01
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategories (id, name, slug, category, description, status, created_at, updated_at) FROM stdin;
2	Belt	Belt	fashion-accessories		Active	2021-05-25 14:48:55.794732+01	2021-05-25 14:48:55.794732+01
1	half shoes	half-shoes	footwears	for your wedding, church programs, naming etc	Active	2021-05-25 14:47:55.098234+01	2021-05-25 14:47:55.098234+01
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribers (id, email, status, created_at, updated_at) FROM stdin;
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 2, true);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 2, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 1, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: reconcillations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reconcillations_id_seq', 10, true);


--
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 2, true);


--
-- Name: subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribers_id_seq', 1, false);


--
-- Name: accounts accounts_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_unique UNIQUE (email);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: brands brands_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_unique UNIQUE (name);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reconcillations reconcillations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reconcillations
    ADD CONSTRAINT reconcillations_pkey PRIMARY KEY (id);


--
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- Name: subscribers subscribers_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_email_unique UNIQUE (email);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: products products_brand_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_foreign FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_sub_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sub_id_foreign FOREIGN KEY (sub_id) REFERENCES public.subcategories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reconcillations reconcillations_approval_one_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reconcillations
    ADD CONSTRAINT reconcillations_approval_one_foreign FOREIGN KEY (approval_one) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reconcillations reconcillations_approval_two_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reconcillations
    ADD CONSTRAINT reconcillations_approval_two_foreign FOREIGN KEY (approval_two) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

