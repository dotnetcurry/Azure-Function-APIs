using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ApiAppFunction.Context;
using ApiAppFunction.Models;

namespace ApiAppFunction
{
    public  class ApiAppFunction
    {
        private readonly ProductDbContext _context;

        public ApiAppFunction(ProductDbContext context)
        {
            _context = context;
        }

        [FunctionName("Get")]
        public async Task<IActionResult> Get(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "products")] HttpRequest req,
            ILogger log)
        {

            try
            {
                // check for the querystring count for keys
                if (req.Query.Keys.Count > 0)
                {
                    // read the 'id' value from the querystring
                    int id = Convert.ToInt32(req.Query["id"]);
                    if (id > 0)
                    {
                        // read data based in 'id'
                        Product product = new Product();
                        product = await _context.Product.FindAsync(id);
                        return new OkObjectResult(product);

                    }
                    else
                    {
                        // return all records
                        List<Product> products = new List<Product>();
                        products = await _context.Product.ToListAsync();
                        return new OkObjectResult(products);
                    }
                }
                else
                {
                    List<Product> products = new List<Product>();
                    products = await _context.Product.ToListAsync();
                    return new OkObjectResult(products);
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }


        }

        [FunctionName("Post")]
        public async Task<IActionResult> Post(
           [HttpTrigger(AuthorizationLevel.Function, "post", Route = "products")] HttpRequest req,
           ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Product product = JsonConvert.DeserializeObject<Product>(requestBody);
                var prd = await _context.Product.AddAsync(product);
                await _context.SaveChangesAsync();
                return new OkObjectResult(prd.Entity);
            }
            catch (Exception ex)
            {
                return new OkObjectResult($"{ex.Message} {ex.InnerException}");
            }
        }

        [FunctionName("Put")]
        public async Task<IActionResult> Put(
          [HttpTrigger(AuthorizationLevel.Function, "put", Route = "products/{id:int}")] HttpRequest req, int id,
          ILogger log)
        {
            try
            {

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Product product = JsonConvert.DeserializeObject<Product>(requestBody);
                if (product.ProductRowId == id)
                {
                    _context.Entry<Product>(product).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return new OkObjectResult(product);
                }
                else
                {
                    return new OkObjectResult($"Record is not found against the Product Row Id as {id}");   
                }
                
            }
            catch (Exception ex)
            {
                return new OkObjectResult($"{ex.Message} {ex.InnerException}");
            }
        }

        [FunctionName("Delete")]
        public async Task<IActionResult> Delete(
          [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "products/{id:int}")] HttpRequest req, int id,
          ILogger log)
        {
            try
            {
                var prd = await _context.Product.FindAsync(id);
                if (prd == null)
                { 
                    return new OkObjectResult($"Record is not found against the Product Row Id as {id}");
                }
                else
                { 
                    _context.Product.Remove(prd);  
                    await _context.SaveChangesAsync();
                    return new OkObjectResult($"Record deleted successfully based on Product Row Id {id}");
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult($"{ex.Message} {ex.InnerException}");
            }
        }
    }
}
