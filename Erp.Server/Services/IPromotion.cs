using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IPromotion
    {
        public List<Promotion> getPromotions();
        Promotion getPromotion(int id);
        DbResult deletePromotion(int id);
        DbResult createOrUpdatePromotion(Promotion promotion);
    }
}
