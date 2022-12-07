import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { isLoading, data } = trpc.movie.getAll.useQuery();
  const {  mutate } = trpc.movie.delete.useMutation({
    onSuccess() {
      router.reload();
    },
  });
  const { data: session } = useSession();

  if (isLoading) return <div>Loading...</div>;

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      mutate(id);
    }
  };
  return (
    <div className="flex flex-wrap gap-3">
      {data?.map((m) => (
        <div className="card w-96 bg-base-100 shadow-xl" key={m.id}>
          <div className="card-body">
            <h3 className="text-xl font-semibold">{m.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="badge-primary badge">{m.genre?.name}</div>
                <div className="badge-secondary badge">{m.year}</div>
                <div className="badge-accent badge">{m.rating}</div>
              </div>
              <div className="flex gap-2">
                {session && (
                  <>
                  <Link
                    href={`/movies/${m.id}`}
                    className="btn-outline btn-primary btn-xs btn"
                  >
                    Edit
                  </Link>
                  <button
                  onClick={()=>onDeleteHandler(m.id)}
                  className="btn-outline btn-primary btn-xs btn"
                >
                  Delete
                </button>
                </>
                )}
                <a
                  href={m.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline btn-secondary btn-xs btn"
                >
                  Go to IMDb
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
