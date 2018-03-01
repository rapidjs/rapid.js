abstract class HttpAdapterInterface {
  public abstract get(url: string, params: object);
  public abstract post(url: string, params: object);
  public abstract put(url: string, params: object);
  public abstract patch(url: string, params: object);
  public abstract head(url: string, params: object);
  public abstract delete(url: string, params: object);
}
